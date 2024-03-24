package com.spendingstracker.app.util;

import com.spendingstracker.app.dto.CustomUserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/** Utility class for creating JWTs. */
@Component
public class JwtUtil {
    private final String secretKey;
    private static final int TEN_HR_EXPIRE_TIME = 1000 * 60 * 60 * 10;

    /**
     * Load the <code>secretKey</code> from the Spring Bean.
     *
     * @param secretKey
     * @see com.spendingstracker.app.config.SecretKeyConfig
     */
    public JwtUtil(@Qualifier("secretKey") String secretKey) {
        this.secretKey = secretKey;
    }

    /**
     * Gets username from JWT
     *
     * @param token JWT token
     * @return username
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Gets expiration from JWT
     *
     * @param token JWT token
     * @return <code>Date</code> of when JWT expires.
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extracts some claim from the JWt.
     *
     * @param token JWT token
     * @param claimsResolver <code>Function</code> that implements how to get the claim
     * @return the claim being extracted
     * @param <T> Claims Type
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extracts <b>all</b> the claims from a JWT.
     *
     * @param token JWT token
     * @return <code>Claims</code> object that contains all the claims of the JWT.
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Returns if JWT is expired.
     *
     * @param token JWT token
     * @return <code>Boolean</code> describing if JWT is expired.
     */
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Generate a new token from a <code>CustomUserDetails</code> object
     *
     * @param userDetails <code>CustomUserDetails</code> object that describe the details of the
     *     user who needs a JWT.
     * @return JWT token string.
     */
    public String generateToken(CustomUserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userDetails.getUserId()); // Add userId to the claims
        return createToken(claims, userDetails.getUsername());
    }

    /**
     * Creates a JWT token from <code>claims</code> and <code>subject</code>.
     *
     * @param claims claims to be inserted into JWT.
     * @param subject who the JWT for
     * @return JWT token string.
     */
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TEN_HR_EXPIRE_TIME))
                .signWith(getSecretKey())
                .compact();
    }

    /**
     * Determine if <code>token</code> is valid by checking if the username of the token is the same
     * as the user attempting access with it.
     *
     * @param token JWT token
     * @param userDetails <code>UserDetails</code> object of user attempting access
     * @return <code>Boolean</code> on if token was determined to be valid.
     */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /**
     * @return <code>secretKey</code>
     */
    private Key getSecretKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    }
}
