# WhiteboardApi

All URIs are relative to *http://localhost:9091*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createWhiteboard**](#createwhiteboard) | **POST** /whiteboards | Create whiteboard|
|[**deleteWhiteboard**](#deletewhiteboard) | **DELETE** /whiteboards/{id} | |
|[**getCollaborators**](#getcollaborators) | **GET** /whiteboards/{id}/collaborators | |
|[**getUserWhiteboards**](#getuserwhiteboards) | **GET** /whiteboards | Get whiteboards by user ID|
|[**getWhiteboardById**](#getwhiteboardbyid) | **GET** /whiteboards/{id} | |
|[**getWhiteboardTitle**](#getwhiteboardtitle) | **GET** /whiteboards/{id}/title | Get whiteboard title|
|[**inviteCollaborators**](#invitecollaborators) | **POST** /whiteboards/{id}/invitations | Invite users to collaborate on the whiteboard|
|[**saveWhiteboardState**](#savewhiteboardstate) | **POST** /whiteboards/{whiteboardId}/save | |
|[**updateTitle**](#updatetitle) | **PUT** /whiteboards/{id}/title | Update title|

# **createWhiteboard**
> WhiteboardResponse createWhiteboard()

Creates a new whiteboard for a user.

### Example

```typescript
import {
    WhiteboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new WhiteboardApi(configuration);

let title: string; // (default to undefined)

const { status, data } = await apiInstance.createWhiteboard(
    title
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **title** | [**string**] |  | defaults to undefined|


### Return type

**WhiteboardResponse**

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

# **deleteWhiteboard**
> deleteWhiteboard()


### Example

```typescript
import {
    WhiteboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new WhiteboardApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deleteWhiteboard(
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

# **getCollaborators**
> Array<UserResponse> getCollaborators()


### Example

```typescript
import {
    WhiteboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new WhiteboardApi(configuration);

let id: number; //ID of the whiteboard (default to undefined)

const { status, data } = await apiInstance.getCollaborators(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ID of the whiteboard | defaults to undefined|


### Return type

**Array<UserResponse>**

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

# **getUserWhiteboards**
> Array<WhiteboardResponse> getUserWhiteboards()

Returns a list of whiteboards for the current user.

### Example

```typescript
import {
    WhiteboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new WhiteboardApi(configuration);

const { status, data } = await apiInstance.getUserWhiteboards();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<WhiteboardResponse>**

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

# **getWhiteboardById**
> WhiteboardResponse getWhiteboardById()


### Example

```typescript
import {
    WhiteboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new WhiteboardApi(configuration);

let id: number; //ID of the whiteboard (default to undefined)

const { status, data } = await apiInstance.getWhiteboardById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ID of the whiteboard | defaults to undefined|


### Return type

**WhiteboardResponse**

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

# **getWhiteboardTitle**
> string getWhiteboardTitle()

Returns the title of a whiteboard by its ID

### Example

```typescript
import {
    WhiteboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new WhiteboardApi(configuration);

let id: number; //ID of the whiteboard (default to undefined)

const { status, data } = await apiInstance.getWhiteboardTitle(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ID of the whiteboard | defaults to undefined|


### Return type

**string**

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

# **inviteCollaborators**
> inviteCollaborators(inviteCollaboratorsRequest)


### Example

```typescript
import {
    WhiteboardApi,
    Configuration,
    InviteCollaboratorsRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new WhiteboardApi(configuration);

let id: number; //ID of the whiteboard (default to undefined)
let inviteCollaboratorsRequest: InviteCollaboratorsRequest; //

const { status, data } = await apiInstance.inviteCollaborators(
    id,
    inviteCollaboratorsRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inviteCollaboratorsRequest** | **InviteCollaboratorsRequest**|  | |
| **id** | [**number**] | ID of the whiteboard | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[keycloak](../README.md#keycloak)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **saveWhiteboardState**
> saveWhiteboardState(whiteboardStateRequest)


### Example

```typescript
import {
    WhiteboardApi,
    Configuration,
    WhiteboardStateDto
} from './api';

const configuration = new Configuration();
const apiInstance = new WhiteboardApi(configuration);

let whiteboardId: number; // (default to undefined)
let whiteboardStateRequest: WhiteboardStateDto; //

const { status, data } = await apiInstance.saveWhiteboardState(
    whiteboardId,
    whiteboardStateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **whiteboardStateRequest** | **WhiteboardStateDto**|  | |
| **whiteboardId** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[keycloak](../README.md#keycloak)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateTitle**
> string updateTitle()

Updates the title of an existing whiteboard.

### Example

```typescript
import {
    WhiteboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new WhiteboardApi(configuration);

let id: number; //ID of the whiteboard (default to undefined)
let title: string; // (default to undefined)

const { status, data } = await apiInstance.updateTitle(
    id,
    title
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ID of the whiteboard | defaults to undefined|
| **title** | [**string**] |  | defaults to undefined|


### Return type

**string**

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

