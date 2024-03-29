package com.ironium.backendangular.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.context.annotation.Bean;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests(authorizeHttpRequests -> authorizeHttpRequests
                                   .requestMatchers("/public/**").permitAll()
                                   .anyRequest().authenticated())
                                   .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
                                   .csrf(Customizer.withDefaults());
        
        return http.build();
    }

}
