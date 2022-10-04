sudo docker run \
-p 8090:8090 \
-v $PWD:/pb_data \
-e S3_ENDPOINT=https://67787a3159a362bf8336032a08f6fbb8.r2.cloudflarestorage.com/earnee \
-e S3_BUCKET=earnee-db \
-e REPLICA_URL=s3://earnee-db.s3.ir-thr-at1.arvanstorage.com/db \
-e LITESTREAM_ACCESS_KEY_ID=8cfe8259187ddc2ff894c2222de4682c \
-e LITESTREAM_SECRET_ACCESS_KEY=a488a12d76a1998c4f3b4038f94f0932d79ee6da535d02263f2461a5202aa4ae \
akashdeep000/pb-prod:0.1