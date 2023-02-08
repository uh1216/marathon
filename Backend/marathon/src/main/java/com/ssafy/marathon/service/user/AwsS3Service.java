package com.ssafy.marathon.service.user;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.marathon.expection.FileUploadFailedException;
import java.io.IOException;
import java.io.InputStream;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AwsS3Service {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    private String CLOUD_FRONT_DOMAIN_NAME = "https://d1v10kml6l14kq.cloudfront.net";

    public String uploadFileV1(String fileName, MultipartFile image)
        throws Exception {
        validateFileExists(image);

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(image.getContentType());
        String dir = "profile/";
        try (InputStream inputStream = image.getInputStream()) {
            amazonS3Client.putObject(
                new PutObjectRequest(bucketName, dir + fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new FileUploadFailedException();
        }

//        return amazonS3Client.getUrl(bucketName, fileName).toString();
        return CLOUD_FRONT_DOMAIN_NAME + "/" + fileName;
    }

    private void validateFileExists(MultipartFile multipartFile) throws Exception {
        if (multipartFile.isEmpty()) {
            throw new Exception();
        }
    }
}
