UPDATE users
    SET
        feeling = $2
    WHERE id = $1
;