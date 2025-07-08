# LlmServiceControllerApi

All URIs are relative to *http://localhost:9091*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**completeText**](#completetext) | **POST** /api/llm/completion | |
|[**healthCheck**](#healthcheck) | **GET** /api/llm/health | |
|[**rephraseText**](#rephrasetext) | **POST** /api/llm/rephrase | |
|[**summarizeText**](#summarizetext) | **POST** /api/llm/summarization | |

# **completeText**
> { [key: string]: string; } completeText(requestBody)


### Example

```typescript
import {
    LlmServiceControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LlmServiceControllerApi(configuration);

let requestBody: { [key: string]: Array<string>; }; //

const { status, data } = await apiInstance.completeText(
    requestBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestBody** | **{ [key: string]: Array<string>; }**|  | |


### Return type

**{ [key: string]: string; }**

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

# **healthCheck**
> { [key: string]: string; } healthCheck()


### Example

```typescript
import {
    LlmServiceControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LlmServiceControllerApi(configuration);

const { status, data } = await apiInstance.healthCheck();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**{ [key: string]: string; }**

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

# **rephraseText**
> { [key: string]: string; } rephraseText(requestBody)


### Example

```typescript
import {
    LlmServiceControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LlmServiceControllerApi(configuration);

let requestBody: { [key: string]: Array<string>; }; //

const { status, data } = await apiInstance.rephraseText(
    requestBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestBody** | **{ [key: string]: Array<string>; }**|  | |


### Return type

**{ [key: string]: string; }**

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

# **summarizeText**
> { [key: string]: string; } summarizeText(requestBody)


### Example

```typescript
import {
    LlmServiceControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LlmServiceControllerApi(configuration);

let requestBody: { [key: string]: Array<string>; }; //

const { status, data } = await apiInstance.summarizeText(
    requestBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestBody** | **{ [key: string]: Array<string>; }**|  | |


### Return type

**{ [key: string]: string; }**

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

