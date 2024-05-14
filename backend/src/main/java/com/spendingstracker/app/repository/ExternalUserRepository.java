package com.spendingstracker.app.repository;

import com.spendingstracker.app.constants.ExternalUserType;
import com.spendingstracker.app.entity.ExternalUser;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.math.BigInteger;

public interface ExternalUserRepository extends CrudRepository<ExternalUser, BigInteger> {
    @Query(
            value =
                    """
                            SELECT
                                COUNT(*)
                            FROM
                                APP.USER U,
                                APP.EXTERNAL_USER EU
                            WHERE
                                    U.USER_ID = EU.USER_ID
                                AND U.USERNAME = :username
                                AND U.EMAIL = :email
                                AND EU.EXTERNAL_IDENTIF = :externalIdentif
                                AND EU.EXTERNAL_USER_TYPE = :externalUserType
                            """,
            nativeQuery = true)
    Integer existsExternalUser(
            @Param("username") String username,
            @Param("email") String email,
            @Param("externalIdentif") String externalIdentif,
            @Param("externalUserType") ExternalUserType externalUserType);
}
