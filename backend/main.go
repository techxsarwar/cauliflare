package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func setupRoutes() http.Handler {
	mux := http.NewServeMux()

	// Metrics
	mux.HandleFunc("/api/metrics", handleMetrics)
	mux.HandleFunc("/metrics", handleMetrics)

	// Code snippets
	mux.HandleFunc("/api/code-snippets", handleCodeSnippets)
	mux.HandleFunc("/code-snippets", handleCodeSnippets)

	// Live GitHub Domain Sync
	mux.HandleFunc("/api/sync-domains", handleSyncDomains)
	mux.HandleFunc("/v1/sync-domains", handleSyncDomains)
	mux.HandleFunc("/sync-domains", handleSyncDomains)

	// URL Threat Scanner
	mux.HandleFunc("/api/scan-url", handleScanURL)
	mux.HandleFunc("/v1/scan-url", handleScanURL)
	mux.HandleFunc("/scan-url", handleScanURL)
	mux.HandleFunc("/v1/scan", handleScanURL)

	// Temp Mail Checker
	mux.HandleFunc("/api/check-email", handleCheckEmail)
	mux.HandleFunc("/v1/check-email", handleCheckEmail)
	mux.HandleFunc("/check-email", handleCheckEmail)

	// Scam Detector
	mux.HandleFunc("/api/detect-scam", handleDetectScam)
	mux.HandleFunc("/v1/detect-scam", handleDetectScam)
	mux.HandleFunc("/detect-scam", handleDetectScam)

	// Search Intelligence
	mux.HandleFunc("/api/search", handleSearch)
	mux.HandleFunc("/v1/search", handleSearch)
	mux.HandleFunc("/search", handleSearch)

	// IP Threat & VPN Detector
	mux.HandleFunc("/api/check-ip", handleCheckIP)
	mux.HandleFunc("/v1/check-ip", handleCheckIP)
	mux.HandleFunc("/check-ip", handleCheckIP)

	// Bulk Batch Email Checker
	mux.HandleFunc("/api/batch-check-email", handleBatchCheckEmail)
	mux.HandleFunc("/v1/batch-check-email", handleBatchCheckEmail)
	mux.HandleFunc("/batch-check-email", handleBatchCheckEmail)

	// Webhook Test Dispatcher
	mux.HandleFunc("/api/webhook/test", handleTestWebhook)
	mux.HandleFunc("/v1/webhook/test", handleTestWebhook)

	// Domain Intelligence & Corporate vs Freemail Inspector
	mux.HandleFunc("/api/inspect-domain", handleInspectDomain)
	mux.HandleFunc("/v1/inspect-domain", handleInspectDomain)
	mux.HandleFunc("/inspect-domain", handleInspectDomain)

	// Phone & VoIP Burner Detector
	mux.HandleFunc("/api/check-phone", handleCheckPhone)
	mux.HandleFunc("/v1/check-phone", handleCheckPhone)
	mux.HandleFunc("/check-phone", handleCheckPhone)

	// Custom Blacklist & Whitelist Rules
	mux.HandleFunc("/api/custom-rules", handleCustomRules)
	mux.HandleFunc("/v1/custom-rules", handleCustomRules)

	// Real-time Logs & Threat Registry APIs
	mux.HandleFunc("/api/logs", handleLogs)
	mux.HandleFunc("/api/threats", handleThreats)
	mux.HandleFunc("/api/domains/sample", handleSampleDomains)

	// Health Check
	mux.HandleFunc("/api/health", handleHealth)
	mux.HandleFunc("/health", handleHealth)

	return CORSMiddleware(mux)
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	// Trigger asynchronous GitHub live domain sync on startup
	go func() {
		log.Println("🔄 Triggering background GitHub disposable domain list sync...")
		if count, err := syncGitHubDomains(); err != nil {
			log.Printf("⚠️ Background GitHub domain sync warning: %v\n", err)
		} else {
			log.Printf("🎉 Background sync completed: %d live disposable domains active!\n", count)
		}
	}()

	addr := fmt.Sprintf(":%s", port)
	handler := setupRoutes()

	log.Printf("⚡ Cauliflare Go Backend running on http://127.0.0.1%s\n", addr)
	if err := http.ListenAndServe(addr, handler); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
