# ViewportControllerApi

All URIs are relative to *http://localhost:9091*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createViewport**](#createviewport) | **POST** /api/viewports | |
|[**deleteViewport**](#deleteviewport) | **DELETE** /api/viewports/{id} | |
|[**getViewportByWhiteboardId**](#getviewportbywhiteboardid) | **GET** /api/viewports/whiteboard/{whiteboardId} | |
|[**updateViewportByWhiteboardId**](#updateviewportbywhiteboardid) | **PUT** /api/viewports/whiteboard/{whiteboardId} | |

# **createViewport**
> Viewport createViewport(viewportCreateRequest)


### Example

```typescript
import {
    ViewportControllerApi,
    Configuration,
    ViewportCreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ViewportControllerApi(configuration);

let viewportCreateRequest: ViewportCreateRequest; //

const { status, data } = await apiInstance.createViewport(
    viewportCreateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **viewportCreateRequest** | **ViewportCreateRequest**|  | |


### Return type

**Viewport**

### Authorization

[keycloak](../README.md#keycloak)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteViewport**
> deleteViewport()


### Example

```typescript
import {
    ViewportControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ViewportControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deleteViewport(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[keycloak](../README.md#keycloak)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getViewportByWhiteboardId**
> Viewport getViewportByWhiteboardId()


### Example

```typescript
import {
    ViewportControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ViewportControllerApi(configuration);

let whiteboardId: number; // (default to undefined)

const { status, data } = await apiInstance.getViewportByWhiteboardId(
    whiteboardId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **whiteboardId** | [**number**] |  | defaults to undefined|


### Return type

**Viewport**

### Authorization

[keycloak](../README.md#keycloak)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateViewportByWhiteboardId**
> Viewport updateViewportByWhiteboardId(viewport)


### Example

```typescript
import {
    ViewportControllerApi,
    Configuration,
    Viewport
} from './api';

const configuration = new Configuration();
const apiInstance = new ViewportControllerApi(configuration);

let whiteboardId: number; // (default to undefined)
let viewport: Viewport; //

const { status, data } = await apiInstance.updateViewportByWhiteboardId(
    whiteboardId,
    viewport
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **viewport** | **Viewport**|  | |
| **whiteboardId** | [**number**] |  | defaults to undefined|


### Return type

**Viewport**

### Authorization

[keycloak](../README.md#keycloak)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

