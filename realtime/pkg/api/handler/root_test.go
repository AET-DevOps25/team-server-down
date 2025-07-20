package handler_test

import (
	"github.com/AET-DevOps25/team-server-down/pkg/api/handler"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestRootHandler(t *testing.T) {
	gin.SetMode(gin.TestMode)

	rh := handler.NewRootHandler()
	router := gin.New()
	router.GET("/", rh.GetRoot)

	req, err := http.NewRequest(http.MethodGet, "/", nil)
	assert.NoError(t, err)

	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	assert.Equal(t, http.StatusOK, rec.Code)

	expectedJSON := `{"message":"Hello World"}`
	assert.JSONEq(t, expectedJSON, rec.Body.String())
}
