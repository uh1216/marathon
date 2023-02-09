package com.ssafy.marathon.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * 어플리케이션의 보안 설정
 */
@Configuration
@EnableWebSecurity // //spring security filter chain에 등록
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public SecurityConfig(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.httpBasic().disable() // REST API는 UI를 사용하지 않으므로 기본설정을 비활성화

            .csrf().disable() // REST API는 csrf 보안이 필요 없으므로 비활성화

            .sessionManagement()
            .sessionCreationPolicy(
                SessionCreationPolicy.STATELESS) // JWT Token 인증방식으로 세션은 필요 없으므로 비활성화
            .and()

            .authorizeRequests() // 리퀘스트에 대한 사용권한 체크
            //테스트 할때  ---------------------------------------------------------------
//            .antMatchers("/**").permitAll()
            //실제 배포할때 -------------------------------------------------------------
            //로그인,회원가입은 모두 가능
            .antMatchers("/user-sign/**","/user-board/**", "/**/signup").permitAll()
            //각 권한에 맞는 설정
            .antMatchers("/patient*/**").hasRole("PATIENT")
            .antMatchers("/doctor*/**").hasRole("DOCTOR")
            .antMatchers("/admin*/**").hasRole("ADMIN")
            //예외는 누구나 발생가능
            .antMatchers("**exception**").permitAll()
            //예외는 누구나 발생가능
            .antMatchers("/webSocket/**").permitAll()
            // 그외에는 인증 필요
            .anyRequest().authenticated()
            //---------------------------------------------------------------
            .and()
            //권한없을시 예외 발생
            .exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler())
            .and()
                .cors().and()
            //인증실패시 예외 발생
            .exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint())
            .and()
            .cors()
            .and()
            //필터 위치 설정 : JWT Token 필터를 id/password 인증 필터 이전에 추가
            .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;

    }

}