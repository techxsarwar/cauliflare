package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestMetricsEndpoint(t *testing.T) {
	handler := setupRoutes()

	req, err := http.NewRequest(http.MethodGet, "/api/metrics", nil)
	if err != nil {
		t.Fatalf("Failed to create request: %v", err)
	}

	rr := httptest.NewRecorder()
	handler.ServeHTTP(rr, req)

	if rr.Code != http.StatusOK {
		t.Errorf("Expected status code 200, got %d", rr.Code)
	}

	var resp MetricsResponse
	if err := json.Unmarshal(rr.Body.Bytes(), &resp); err != nil {
		t.Fatalf("Failed to parse JSON response: %v", err)
	}

	if resp.TotalDomains < 50 || resp.Uptime.Target != 99.99 {
		t.Errorf("Unexpected metrics response: %+v", resp)
	}
}

func TestCheckEmailEndpoint(t *testing.T) {
	handler := setupRoutes()

	// 1. Test disposable email (mailinator) -> expect BLOCK
	body := bytes.NewBufferString(`{"email": "user@mailinator.com"}`)
	req, _ := http.NewRequest(http.MethodPost, "/api/check-email", body)
	rr := httptest.NewRecorder()
	handler.ServeHTTP(rr, req)

	if rr.Code != http.StatusOK {
		t.Errorf("Expected status code 200, got %d", rr.Code)
	}

	var resp CheckEmailResponse
	json.Unmarshal(rr.Body.Bytes(), &resp)
	if !resp.Disposable || resp.Recommendation != "BLOCK" || resp.Provider != "Mailinator" {
		t.Errorf("Expected Mailinator temp mail detection & BLOCK, got %+v", resp)
	}

	// 2. Test obscure GitHub disposable email (0-00.usa.cc) -> expect BLOCK
	domainMutex.Lock()
	liveDomainRegistry["0-00.usa.cc"] = "GitHub Disposable Registry"
	domainMutex.Unlock()

	bodyGithub := bytes.NewBufferString(`{"email": "test@0-00.usa.cc"}`)
	reqGithub, _ := http.NewRequest(http.MethodPost, "/api/check-email", bodyGithub)
	rrGithub := httptest.NewRecorder()
	handler.ServeHTTP(rrGithub, reqGithub)

	json.Unmarshal(rrGithub.Body.Bytes(), &resp)
	if !resp.Disposable || resp.Recommendation != "BLOCK" {
		t.Errorf("Expected GitHub disposable domain to be blocked, got %+v", resp)
	}

	// 3. Test legitimate email (dev@company.com) -> expect ALLOW
	bodyLegit := bytes.NewBufferString(`{"email": "dev@company.com"}`)
	reqLegit, _ := http.NewRequest(http.MethodPost, "/api/check-email", bodyLegit)
	rrLegit := httptest.NewRecorder()
	handler.ServeHTTP(rrLegit, reqLegit)

	json.Unmarshal(rrLegit.Body.Bytes(), &resp)
	if resp.Disposable || resp.Recommendation != "ALLOW" {
		t.Errorf("Expected legitimate mail to be allowed, got %+v", resp)
	}
}

func TestSyncDomainsEndpoint(t *testing.T) {
	handler := setupRoutes()

	req, _ := http.NewRequest(http.MethodPost, "/api/sync-domains", nil)
	rr := httptest.NewRecorder()
	handler.ServeHTTP(rr, req)

	if rr.Code != http.StatusOK {
		t.Errorf("Expected status code 200 for sync domains, got %d", rr.Code)
	}

	var resp SyncResponse
	json.Unmarshal(rr.Body.Bytes(), &resp)
	if resp.Status != "success" || resp.TotalDomains < 100 {
		t.Errorf("Unexpected sync response: %+v", resp)
	}
}

func TestScanURLEndpoint(t *testing.T) {
	handler := setupRoutes()

	body := bytes.NewBufferString(`{"url": "https://bit.ly/3x8f1z"}`)
	req, _ := http.NewRequest(http.MethodPost, "/api/scan-url", body)
	rr := httptest.NewRecorder()
	handler.ServeHTTP(rr, req)

	if rr.Code != http.StatusOK {
		t.Errorf("Expected status code 200, got %d", rr.Code)
	}

	var resp ScanURLResponse
	json.Unmarshal(rr.Body.Bytes(), &resp)
	if resp.Safe != false || resp.Recommendation != "BLOCK" {
		t.Errorf("Expected BLOCK flag for phishing URL, got %+v", resp)
	}
}

func TestDetectScamEndpoint(t *testing.T) {
	handler := setupRoutes()

	body := bytes.NewBufferString(`{"text": "Send OTP to claim your reward"}`)
	req, _ := http.NewRequest(http.MethodPost, "/api/detect-scam", body)
	rr := httptest.NewRecorder()
	handler.ServeHTTP(rr, req)

	if rr.Code != http.StatusOK {
		t.Errorf("Expected status code 200, got %d", rr.Code)
	}

	var resp DetectScamResponse
	json.Unmarshal(rr.Body.Bytes(), &resp)
	if !resp.Scam || resp.Recommendation != "BLOCK" {
		t.Errorf("Expected BLOCK flag for scam text, got %+v", resp)
	}
}

func TestHealthEndpoint(t *testing.T) {
	handler := setupRoutes()

	req, _ := http.NewRequest(http.MethodGet, "/api/health", nil)
	rr := httptest.NewRecorder()
	handler.ServeHTTP(rr, req)

	if rr.Code != http.StatusOK {
		t.Errorf("Expected status code 200, got %d", rr.Code)
	}

	var resp HealthResponse
	json.Unmarshal(rr.Body.Bytes(), &resp)
	if resp.Status != "ok" || resp.Service != "cauliflare-go-backend" || resp.TotalDomains < 50 {
		t.Errorf("Unexpected health response: %+v", resp)
	}
}
