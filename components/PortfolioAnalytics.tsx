"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const environment =
  process.env.NEXT_PUBLIC_POSTHOG_ENVIRONMENT ||
  (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? "preview"
    : process.env.NODE_ENV === "production" ? "production" : "dev");
const clickEvents = new Set([
  "project_link_clicked",
  "article_link_clicked",
  "contact_clicked",
]);
const testStorageKey = "yukiuix.analytics_test";
let initialized = false;
let testSession = false;

function cleanUrl(value: string): string {
  if (!value || value === "$direct") return value;
  try {
    const url = new URL(value, window.location.origin);
    return url.protocol === "http:" || url.protocol === "https:"
      ? `${url.origin}${url.pathname}`
      : url.protocol;
  } catch {
    return "";
  }
}

function isTestSession(): boolean {
  const flag = new URLSearchParams(window.location.search).get("analytics_test");
  if (flag === "1" || flag === "0") testSession = flag === "1";
  try {
    if (flag === "1") sessionStorage.setItem(testStorageKey, "1");
    if (flag === "0") sessionStorage.removeItem(testStorageKey);
    testSession = sessionStorage.getItem(testStorageKey) === "1";
  } catch {
    // Restricted storage still keeps the test flag during client-side navigation.
  }
  return (
    environment !== "production" ||
    ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname) ||
    window.location.hostname.endsWith(".vercel.app") ||
    testSession
  );
}

function initAnalytics() {
  if (initialized || !key) return;
  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    persistence: "localStorage",
    person_profiles: "never",
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    capture_dead_clicks: false,
    capture_heatmaps: false,
    capture_performance: false,
    capture_exceptions: false,
    disable_session_recording: true,
    disable_surveys: true,
    disable_conversations: true,
    disable_product_tours: true,
    disable_web_experiments: true,
    advanced_disable_flags: true,
    save_campaign_params: false,
    save_referrer: false,
    disable_capture_url_hashes: true,
    property_denylist: ["$elements", "$el_text", "ph_keyword"],
    before_send: (event) => {
      if (!event || (event.event !== "$pageview" && !clickEvents.has(event.event))) {
        return null;
      }
      for (const [name, value] of Object.entries(event.properties)) {
        if (typeof value === "string" && /url|referrer/i.test(name)) {
          event.properties[name] = cleanUrl(value);
        }
      }
      delete event.properties.$set;
      delete event.properties.$set_once;
      return event;
    },
  });
  initialized = true;
}

export default function PortfolioAnalytics({ locale }: { locale: string }) {
  const pathname = usePathname();
  const lastPageview = useRef<string | null>(null);

  useEffect(() => {
    if (!key || !pathname) return;
    initAnalytics();

    const pageProperties = () => ({
      locale,
      page_path: pathname,
      environment,
      is_test: isTestSession(),
      $current_url: cleanUrl(window.location.href),
      $referrer: cleanUrl(document.referrer),
    });

    // React Strict Mode replays effects; a path is counted once until it changes.
    if (lastPageview.current !== pathname) {
      lastPageview.current = pathname;
      posthog.capture("$pageview", pageProperties());
    }

    const onLinkClick = (event: MouseEvent) => {
      if (event.type === "click" ? event.button !== 0 : event.button !== 1) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[data-analytics-event]");
      if (!link) return;
      const name = link.dataset.analyticsEvent;
      if (!name || !clickEvents.has(name)) return;

      posthog.capture(name, {
        ...pageProperties(),
        placement: link.dataset.analyticsPlacement,
        target_type: link.dataset.analyticsTarget,
        target_url: cleanUrl(link.href),
        ...(name === "project_link_clicked" && { project_name: link.dataset.analyticsProject }),
        ...(name === "article_link_clicked" && { article_slug: link.dataset.analyticsArticle }),
      });
    };

    document.addEventListener("click", onLinkClick, true);
    document.addEventListener("auxclick", onLinkClick, true);
    return () => {
      document.removeEventListener("click", onLinkClick, true);
      document.removeEventListener("auxclick", onLinkClick, true);
    };
  }, [pathname, locale]);

  return null;
}
