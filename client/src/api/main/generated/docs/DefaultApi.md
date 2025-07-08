# DefaultApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**completeTextCompletionPost**](#completetextcompletionpost) | **POST** /completion | Complete Text|
|[**healthCheckHealthGet**](#healthcheckhealthget) | **GET** /health | Health Check|
|[**rephraseTextRephrasePost**](#rephrasetextrephrasepost) | **POST** /rephrase | Rephrase Text|
|[**summarizeTextSummarizationPost**](#summarizetextsummarizationpost) | **POST** /summarization | Summarize Text|

# **completeTextCompletionPost**
> TextResponse completeTextCompletionPost(textRequest)


### Example

```typescript
import {
    DefaultApi,
    Configuration,
    TextRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let textRequest: TextRequest; //

const { status, data } = await apiInstance.completeTextCompletionPost(
    textRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **textRequest** | **TextRequest**|  | |


### Return type

**TextResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **healthCheckHealthGet**
> any healthCheckHealthGet()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.healthCheckHealthGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rephraseTextRephrasePost**
> TextResponse rephraseTextRephrasePost(textRequest)


### Example

```typescript
import {
    DefaultApi,
    Configuration,
    TextRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let textRequest: TextRequest; //

const { status, data } = await apiInstance.rephraseTextRephrasePost(
    textRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **textRequest** | **TextRequest**|  | |


### Return type

**TextResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **summarizeTextSummarizationPost**
> TextResponse summarizeTextSummarizationPost(textRequest)


### Example

```typescript
import {
    DefaultApi,
    Configuration,
    TextRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let textRequest: TextRequest; //

const { status, data } = await apiInstance.summarizeTextSummarizationPost(
    textRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **textRequest** | **TextRequest**|  | |


### Return type

**TextResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

