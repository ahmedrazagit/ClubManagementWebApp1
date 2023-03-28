package uk.ac.bham.teamproject.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Clubs.
 */
@Entity
@Table(name = "clubs")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Clubs implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 5, max = 30)
    @Column(name = "clubname", length = 30, nullable = false, unique = true)
    private String clubname;

    @NotNull
    @Size(min = 10, max = 600)
    @Column(name = "clubdescription", length = 600, nullable = false)
    private String clubdescription;

    @NotNull
    @Column(name = "numberofmembers", nullable = false)
    private Integer numberofmembers;

    @NotNull
    @Column(name = "numberofevents", nullable = false)
    private Integer numberofevents;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Clubs id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClubname() {
        return this.clubname;
    }

    public Clubs clubname(String clubname) {
        this.setClubname(clubname);
        return this;
    }

    public void setClubname(String clubname) {
        this.clubname = clubname;
    }

    public String getClubdescription() {
        return this.clubdescription;
    }

    public Clubs clubdescription(String clubdescription) {
        this.setClubdescription(clubdescription);
        return this;
    }

    public void setClubdescription(String clubdescription) {
        this.clubdescription = clubdescription;
    }

    public Integer getNumberofmembers() {
        return this.numberofmembers;
    }

    public Clubs numberofmembers(Integer numberofmembers) {
        this.setNumberofmembers(numberofmembers);
        return this;
    }

    public void setNumberofmembers(Integer numberofmembers) {
        this.numberofmembers = numberofmembers;
    }

    public Integer getNumberofevents() {
        return this.numberofevents;
    }

    public Clubs numberofevents(Integer numberofevents) {
        this.setNumberofevents(numberofevents);
        return this;
    }

    public void setNumberofevents(Integer numberofevents) {
        this.numberofevents = numberofevents;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Clubs)) {
            return false;
        }
        return id != null && id.equals(((Clubs) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Clubs{" +
            "id=" + getId() +
            ", clubname='" + getClubname() + "'" +
            ", clubdescription='" + getClubdescription() + "'" +
            ", numberofmembers=" + getNumberofmembers() +
            ", numberofevents=" + getNumberofevents() +
            "}";
    }
}
