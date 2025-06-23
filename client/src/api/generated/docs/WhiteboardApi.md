# WhiteboardApi

All URIs are relative to *http://server:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createWhiteboard**](#createwhiteboard) | **POST** /whiteboards | Create whiteboard|
|[**deleteWhiteboard**](#deletewhiteboard) | **DELETE** /whiteboards/{id} | Delete whiteboard|
|[**getWhiteboardByIdAndUserId**](#getwhiteboardbyidanduserid) | **GET** /whiteboards/{id} | |
|[**getWhiteboardsByUserId**](#getwhiteboardsbyuserid) | **GET** /whiteboards | Get whiteboards by user ID|
|[**updateTitle**](#updatetitle) | **PUT** /whiteboards/{id}/title | Update title|

# **createWhiteboard**
> Whiteboard createWhiteboard(createWhiteboardRequest)

Creates a new whiteboard for a user.

### Example

```typescript
import {
    WhiteboardApi,
    Configuration,
    CreateWhiteboardRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new WhiteboardApi(configuration);

let createWhiteboardRequest: CreateWhiteboardRequest; //

const { status, data } = await apiInstance.createWhiteboard(
    createWhiteboardRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createWhiteboardRequest** | **CreateWhiteboardRequest**|  | |


### Return type

**Whiteboard**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteWhiteboard**
> deleteWhiteboard()

Deletes a whiteboard by its ID.

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

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getWhiteboardByIdAndUserId**
> Whiteboard getWhiteboardByIdAndUserId()


### Example

```typescript
import {
    WhiteboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new WhiteboardApi(configuration);

let id: number; // (default to undefined)
let userId: number; // (default to undefined)

const { status, data } = await apiInstance.getWhiteboardByIdAndUserId(
    id,
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|
| **userId** | [**number**] |  | defaults to undefined|


### Return type

**Whiteboard**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getWhiteboardsByUserId**
> Array<Whiteboard> getWhiteboardsByUserId()

Returns a list of whiteboards for the given user ID.

### Example

```typescript
import {
    WhiteboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new WhiteboardApi(configuration);

let userId: number; // (default to undefined)

const { status, data } = await apiInstance.getWhiteboardsByUserId(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|


### Return type

**Array<Whiteboard>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateTitle**
> Whiteboard updateTitle()

Updates the title of an existing whiteboard.

### Example

```typescript
import {
    WhiteboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new WhiteboardApi(configuration);

let id: number; // (default to undefined)
let title: string; // (default to undefined)

const { status, data } = await apiInstance.updateTitle(
    id,
    title
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|
| **title** | [**string**] |  | defaults to undefined|


### Return type

**Whiteboard**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

