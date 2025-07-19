package de.tum.cit.aet.devops.teamserverdown.config;

import io.micrometer.common.KeyValue;
import io.micrometer.common.KeyValues;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.observation.DefaultServerRequestObservationConvention;
import org.springframework.http.server.observation.ServerRequestObservationConvention;
import org.springframework.http.server.observation.ServerRequestObservationContext;

import java.util.Optional;

@Configuration
public class MicrometerConfiguration {
    private static final String KEY_URI = "uri";
    private static final String UNKNOWN = "UNKNOWN";

    @Bean
    public ServerRequestObservationConvention uriTagContributorForObservationApi() {
        return new DefaultServerRequestObservationConvention() {
            @Override
            public KeyValues getLowCardinalityKeyValues(ServerRequestObservationContext context) {
                KeyValues lowCardinalityKeyValues = super.getLowCardinalityKeyValues(context);

                if (isUriTagNullOrUnknown(context, lowCardinalityKeyValues)) {
                    return lowCardinalityKeyValues
                            .and(KeyValue.of(KEY_URI, context.getCarrier().getRequestURI()));
                }

                return lowCardinalityKeyValues;
            }

            private static boolean isUriTagNullOrUnknown(ServerRequestObservationContext context, KeyValues lowCardinalityKeyValues) {
                Optional<KeyValue> uriKeyValue = lowCardinalityKeyValues.stream()
                        .filter(keyValue -> KEY_URI.equals(keyValue.getKey()))
                        .findFirst();

                return uriKeyValue.isEmpty() || UNKNOWN.equals(uriKeyValue.get().getValue());
            }
        };
    }
}