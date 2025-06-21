# RootApi

All URIs are relative to *http://server:9091*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**root**](#root) | **GET** / | Root endpoint|

# **root**
> string root()

Returns a simple Hello World message.

### Example

```typescript
import {
    RootApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RootApi(configuration);

const { status, data } = await apiInstance.root();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**string**

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

