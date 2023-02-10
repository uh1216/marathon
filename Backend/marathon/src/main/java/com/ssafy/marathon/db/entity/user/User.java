package com.ssafy.marathon.db.entity.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.sql.Blob;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Table(name = "user")
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Long seq;
    @Column(nullable = false, unique = true)
    private String id;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    // Json 결과로 출력하지 않을 데이터에 대해 해당 어노테이션 설정 값 추가
    //lombok을 사용하고 있다면 제 생각엔 @JsonProperty를 사용하는것 접근을 제어하는데 유리
    @Column(nullable = false)
    private String password;
    private String name;
    //남 : 1(true),  여 : 0(false)
    private boolean sex;
    private String email;
    private String phone;
    private String img;
    private LocalDate birthDate;
    private String kakao;

    @Column(updatable = false, insertable = false)
    private String dtype;
    @Column(updatable = false)
    private LocalDate registDate;
    @ElementCollection(fetch = FetchType.EAGER)
    //컬렉션과 같은 형태의 데이터를 컬럼에 저장할 수 없기 때문에, 별도의 테이블을 생성하여 컬렉션을 관리해야 합니다.
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public String getUsername() {
        return this.id;
    }

    /**
     * 계정이 만료되었는지 체크하는 로직 이 예제에서는 사용하지 않으므로 true 값 return
     *
     * @return true
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * 계정이 잠겼는지 체크하는 로직 이 예제에서는 사용하지 않으므로 true 값 return
     *
     * @return true
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * 계정의 패스워드가 만료되었는지 체크하는 로직 이 예제에서는 사용하지 않으므로 true 값 return
     *
     * @return true
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * 계정이 사용가능한지 체크하는 로직 이 예제에서는 사용하지 않으므로 true 값 return
     *
     * @return true
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isEnabled() {
        return true;
    }
}
