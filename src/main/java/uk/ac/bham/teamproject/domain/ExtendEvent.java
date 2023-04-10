package uk.ac.bham.teamproject.domain;

import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ExtendEvent.
 */
@Entity
@Table(name = "extend_event")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ExtendEvent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 10, max = 50)
    @Column(name = "eventname", length = 50, nullable = false, unique = true)
    private String eventname;

    @NotNull
    @Column(name = "date", nullable = false)
    private ZonedDateTime date;

    @NotNull
    @Size(min = 10, max = 50)
    @Column(name = "location", length = 50, nullable = false)
    private String location;

    @NotNull
    @Size(min = 10, max = 100)
    @Column(name = "eventdescription", length = 100, nullable = false)
    private String eventdescription;

    @NotNull
    @Size(min = 10, max = 50)
    @Column(name = "club", length = 50, nullable = false)
    private String club;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ExtendEvent id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEventname() {
        return this.eventname;
    }

    public ExtendEvent eventname(String eventname) {
        this.setEventname(eventname);
        return this;
    }

    public void setEventname(String eventname) {
        this.eventname = eventname;
    }

    public ZonedDateTime getDate() {
        return this.date;
    }

    public ExtendEvent date(ZonedDateTime date) {
        this.setDate(date);
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public String getLocation() {
        return this.location;
    }

    public ExtendEvent location(String location) {
        this.setLocation(location);
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getEventdescription() {
        return this.eventdescription;
    }

    public ExtendEvent eventdescription(String eventdescription) {
        this.setEventdescription(eventdescription);
        return this;
    }

    public void setEventdescription(String eventdescription) {
        this.eventdescription = eventdescription;
    }

    public String getClub() {
        return this.club;
    }

    public ExtendEvent club(String club) {
        this.setClub(club);
        return this;
    }

    public void setClub(String club) {
        this.club = club;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ExtendEvent)) {
            return false;
        }
        return id != null && id.equals(((ExtendEvent) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ExtendEvent{" +
            "id=" + getId() +
            ", eventname='" + getEventname() + "'" +
            ", date='" + getDate() + "'" +
            ", location='" + getLocation() + "'" +
            ", eventdescription='" + getEventdescription() + "'" +
            ", club='" + getClub() + "'" +
            "}";
    }
}
