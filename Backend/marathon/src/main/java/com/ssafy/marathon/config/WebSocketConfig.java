package com.ssafy.marathon.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        엔드 포인트 설정
        registry.addEndpoint("/ws")
//            cors오류 방지
            .setAllowedOrigins("*");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
//        서버가 /sub에게 메세지 보내기
        registry.enableSimpleBroker("/sub");
//        /pub이 붙은 애들인 모두 MessageMapping으로 바운딩
        registry.setApplicationDestinationPrefixes("/pub");
    }
}
