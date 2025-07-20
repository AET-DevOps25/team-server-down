# EdgeControllerApi

All URIs are relative to *http://localhost:9091*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addEdge**](#addedge) | **POST** /edge | |
|[**deleteEdge**](#deleteedge) | **DELETE** /edge/{id} | |
|[**getEdgesByWhiteboard**](#getedgesbywhiteboard) | **GET** /edge/whiteboard/{whiteboardId} | |

# **addEdge**
> Edge addEdge(edge)


### Example

```typescript
import {
    EdgeControllerApi,
    Configuration,
    Edge
} from './api';

const configuration = new Configuration();
const apiInstance = new EdgeControllerApi(configuration);

let edge: Edge; //

const { status, data } = await apiInstance.addEdge(
    edge
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **edge** | **Edge**|  | |


### Return type

**Edge**

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

# **deleteEdge**
> deleteEdge()


### Example

```typescript
import {
    EdgeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EdgeControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.deleteEdge(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


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

# **getEdgesByWhiteboard**
> Array<Edge> getEdgesByWhiteboard()


### Example

```typescript
import {
    EdgeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EdgeControllerApi(configuration);

let whiteboardId: number; // (default to undefined)

const { status, data } = await apiInstance.getEdgesByWhiteboard(
    whiteboardId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **whiteboardId** | [**number**] |  | defaults to undefined|


### Return type

**Array<Edge>**

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

