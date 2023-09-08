package com.bootcamp107.userservice.service;

import com.bootcamp107.userservice.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class JwtServiceTest {

    @Mock
    private AuthUserDetailsService authUserDetailsService;
    @InjectMocks
    private JwtService jwtService;
    private static final String key = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
    private static final long expirationTime = 86400000L;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        jwtService.setJwtExpiration(expirationTime);
        jwtService.setSecretKey(key);
    }

    @Test
    void givenToken_thenExtractUsername() {
        String token = generateJwtToken("test_user", 3600000L); // Generate a real JWT token

        String username = jwtService.extractUsername(token);

        assertEquals("test_user", username);
    }

    @Test
    void givenToken_thenExtractClaim() {
        String token = generateJwtToken("test_user", 3600000L); // Generate a real JWT token

        String subject = jwtService.extractClaim(token, Claims::getSubject);

        assertEquals("test_user", subject);
    }

    @Test
    void givenUserDetailsAndClaims_whenGenerateToken() {
        UserDetails userDetails = getUserDetails();

        String generatedToken = jwtService.generateToken(userDetails);

        assertNotNull(generatedToken);
        byte[] keyBytes = Decoders.BASE64.decode(key);
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(keyBytes))
                .build()
                .parseClaimsJws(generatedToken)
                .getBody();

        assertEquals("test_user", claims.getSubject());

    }

    @Test
    void testGenerateTokenWithNoExtraClaims() {
        UserDetails userDetails = new User();
        String generatedToken = jwtService.generateToken(userDetails);
        assertNotNull(generatedToken);
    }

    @Test
    void testIsTokenExpired() {
        String token = generateJwtToken("test_user", -3600000L); // Generate an expired JWT token

        assertThrows(ExpiredJwtException.class, () -> jwtService.isTokenExpired(token));
    }

    @Test
    void givenToken_thenExtractExpiration() {
        String token = generateJwtToken("test_user", 3600000L); // Generate a real JWT token

        Date expirationDate = jwtService.extractExpiration(token);

        assertNotNull(expirationDate);
    }

    @Test
    void givenToken_thenExtractAllClaims() {
        String token = generateJwtToken("test_user", 3600000L);

        Claims claims = jwtService.extractAllClaims(token);

        assertNotNull(claims);
    }

    @Test
    void givenToken_whenTokenNotExpired_thenDoNothing() {
        String token = generateJwtToken("test_user", 3600000L);
        UserDetails user = getUserDetails();
        when(authUserDetailsService.loadUserByUsername("test_user")).thenReturn(user);
        assertDoesNotThrow(() -> jwtService.validateToken(token));
    }

    @Test
    void givenToken_whenTokenExpired_thenDoNothing() {
        String token = generateJwtToken("test_user", -3600000L);
        UserDetails user = getUserDetails();
        when(authUserDetailsService.loadUserByUsername("test_user")).thenReturn(user);
        assertThrows(
                ExpiredJwtException.class,
                () -> jwtService.validateToken(token)
        );
    }

    private String generateJwtToken(String username, long expiration) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(jwtService.getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private User getUserDetails() {
        User user = new User().builder()
                .id(UUID.randomUUID())
                .email("test_user")
                .address("address")
                .accountType("checking")
                .password("password")
                .firstName("firstName")
                .lastName("lastName")
                .build();
        return user;
    }
}
