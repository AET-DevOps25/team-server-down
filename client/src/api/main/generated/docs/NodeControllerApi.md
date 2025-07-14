# NodeControllerApi

All URIs are relative to *http://localhost:9091*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createNode**](#createnode) | **POST** /nodes | |
|[**deleteNode**](#deletenode) | **DELETE** /nodes/{id} | |
|[**getAllByWhiteboardId**](#getallbywhiteboardid) | **GET** /nodes/whiteboard/{whiteboardId} | |
|[**patchNode**](#patchnode) | **PATCH** /nodes/nodes/{id} | |

# **createNode**
> Node createNode(node)


### Example

```typescript
import {
    NodeControllerApi,
    Configuration,
    Node
} from './api';

const configuration = new Configuration();
const apiInstance = new NodeControllerApi(configuration);

let node: Node; //

const { status, data } = await apiInstance.createNode(
    node
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **node** | **Node**|  | |


### Return type

**Node**

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

# **deleteNode**
> deleteNode()


### Example

```typescript
import {
    NodeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NodeControllerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.deleteNode(
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

# **getAllByWhiteboardId**
> Array<Node> getAllByWhiteboardId()


### Example

```typescript
import {
    NodeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NodeControllerApi(configuration);

let whiteboardId: number; // (default to undefined)

const { status, data } = await apiInstance.getAllByWhiteboardId(
    whiteboardId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **whiteboardId** | [**number**] |  | defaults to undefined|


### Return type

**Array<Node>**

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

# **patchNode**
> Node patchNode(nodeUpdateDTO)


### Example

```typescript
import {
    NodeControllerApi,
    Configuration,
    NodeUpdateDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new NodeControllerApi(configuration);

let id: string; // (default to undefined)
let nodeUpdateDTO: NodeUpdateDTO; //

const { status, data } = await apiInstance.patchNode(
    id,
    nodeUpdateDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **nodeUpdateDTO** | **NodeUpdateDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Node**

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

