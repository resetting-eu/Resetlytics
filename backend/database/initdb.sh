#!/bin/bash

mysql -u root --password="$MYSQL_ROOT_PASSWORD" ${MYSQL_DATABASE} < dump_resetlyticsdb.sql << EOF
mysql -u root --password="$MYSQL_ROOT_PASSWORD" << EOF
USE "${MYSQL_DATABASE}";
GRANT ALL PRIVILEGES ON TEST_${MYSQL_DATABASE}.* TO '${MYSQL_USER}'
EOF
