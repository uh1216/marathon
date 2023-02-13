package com.ssafy.marathon.controller.openvidu;

import com.ssafy.marathon.config.security.JwtTokenProvider;
import com.ssafy.marathon.db.entity.treatment.History;
import com.ssafy.marathon.db.repository.HistoryRepository;
import com.ssafy.marathon.db.repository.TreatmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Recording.OutputMode;
import io.openvidu.java.client.RecordingMode;
import io.openvidu.java.client.RecordingProperties;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import java.util.Map;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class OpenviduController {

	@Value("${OPENVIDU_URL}")
	private String OPENVIDU_URL;

	@Value("${OPENVIDU_SECRET}")
	private String OPENVIDU_SECRET;

	private OpenVidu openvidu;

	private final JwtTokenProvider jwtTokenProvider;
	private final HistoryRepository historyRepository;

	@PostConstruct
	public void init() {
		this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
	}

	/**
	 * @param params The Session properties
	 * @return The Session ID
	 */
	@PostMapping("/sessions")
	public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params,
													@RequestHeader("Access-Token") String accessToken)
			throws OpenViduJavaClientException, OpenViduHttpException {

		String role = accessToken == null ? null : jwtTokenProvider.getUserRole(accessToken);
		System.out.println(role);


		SessionProperties properties = SessionProperties.fromJson(params).build();
		Session session = openvidu.createSession(properties);

		if(role == null ||
				(session.getConnections().size() == 0 &&
					!(role.equals("[ROLE_DOCTOR]") || role.equals("[ROLE_ADMIN]"))
				)
		)
			return new ResponseEntity<>("방을 생성할 권한 없음", HttpStatus.UNAUTHORIZED);

		if(role.equals("[ROLE_DOCTOR]")){
			History history = historyRepository.findBySeq((Long) params.get("historySeq"));
			history.setVideoUrl(session.getSessionId());
			historyRepository.save(history);
		}

		return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
	}


    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
        @RequestBody(required = false) Map<String, Object> params)
        throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

}
