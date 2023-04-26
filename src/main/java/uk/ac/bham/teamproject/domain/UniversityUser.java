package uk.ac.bham.teamproject.domain;

import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A UniversityUser.
 */
@Entity
@Table(name = "university_user")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UniversityUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Size(min = 3)
    @Column(name = "name")
    private String name;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "role")
    private String role;

    @Column(name = "student_id")
    private String studentId;

    @Column(name = "gender")
    private String gender;

    @Column(name = "birthday")
    private ZonedDateTime birthday;

    @Column(name = "clubs")
    private String clubs;

    @Column(name = "uni")
    private String uni;

    @Column(name = "email")
    private String email;

    @Column(name = "balance")
    private Long balance;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public UniversityUser id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public UniversityUser name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNickname() {
        return this.nickname;
    }

    public UniversityUser nickname(String nickname) {
        this.setNickname(nickname);
        return this;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getRole() {
        return this.role;
    }

    public UniversityUser role(String role) {
        this.setRole(role);
        return this;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getStudentId() {
        return this.studentId;
    }

    public UniversityUser studentId(String studentId) {
        this.setStudentId(studentId);
        return this;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getGender() {
        return this.gender;
    }

    public UniversityUser gender(String gender) {
        this.setGender(gender);
        return this;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public ZonedDateTime getBirthday() {
        return this.birthday;
    }

    public UniversityUser birthday(ZonedDateTime birthday) {
        this.setBirthday(birthday);
        return this;
    }

    public void setBirthday(ZonedDateTime birthday) {
        this.birthday = birthday;
    }

    public String getClubs() {
        return this.clubs;
    }

    public UniversityUser clubs(String clubs) {
        this.setClubs(clubs);
        return this;
    }

    public void setClubs(String clubs) {
        this.clubs = clubs;
    }

    public String getUni() {
        return this.uni;
    }

    public UniversityUser uni(String uni) {
        this.setUni(uni);
        return this;
    }

    public void setUni(String uni) {
        this.uni = uni;
    }

    public String getEmail() {
        return this.email;
    }

    public UniversityUser email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getBalance() {
        return this.balance;
    }

    public UniversityUser balance(Long balance) {
        this.setBalance(balance);
        return this;
    }

    public void setBalance(Long balance) {
        this.balance = balance;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UniversityUser)) {
            return false;
        }
        return id != null && id.equals(((UniversityUser) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UniversityUser{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", nickname='" + getNickname() + "'" +
            ", role='" + getRole() + "'" +
            ", studentId='" + getStudentId() + "'" +
            ", gender='" + getGender() + "'" +
            ", birthday='" + getBirthday() + "'" +
            ", clubs='" + getClubs() + "'" +
            ", uni='" + getUni() + "'" +
            ", email='" + getEmail() + "'" +
            ", balance=" + getBalance() +
            "}";
    }
}
