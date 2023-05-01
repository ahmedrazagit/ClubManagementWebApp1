package uk.ac.bham.teamproject.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import uk.ac.bham.teamproject.domain.enumeration.CategoryType;

/**
 * A ExtendedEvents.
 */
@Entity
@Table(name = "extended_events")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ExtendedEvents implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 10, max = 50)
    @Column(name = "event", length = 50, nullable = false, unique = true)
    private String event;

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

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private CategoryType category;

    @ManyToOne
    @JsonIgnoreProperties(value = { "user" }, allowSetters = true)
    private ExtendClub club;

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ExtendedEvents id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEvent() {
        return this.event;
    }

    public ExtendedEvents event(String event) {
        this.setEvent(event);
        return this;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public ZonedDateTime getDate() {
        return this.date;
    }

    public ExtendedEvents date(ZonedDateTime date) {
        this.setDate(date);
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public String getLocation() {
        return this.location;
    }

    public ExtendedEvents location(String location) {
        this.setLocation(location);
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getEventdescription() {
        return this.eventdescription;
    }

    public ExtendedEvents eventdescription(String eventdescription) {
        this.setEventdescription(eventdescription);
        return this;
    }

    public void setEventdescription(String eventdescription) {
        this.eventdescription = eventdescription;
    }

    public CategoryType getCategory() {
        return this.category;
    }

    public ExtendedEvents category(CategoryType category) {
        this.setCategory(category);
        return this;
    }

    public void setCategory(CategoryType category) {
        this.category = category;
    }

    public ExtendClub getClub() {
        return this.club;
    }

    public void setClub(ExtendClub extendClub) {
        this.club = extendClub;
    }

    public ExtendedEvents club(ExtendClub extendClub) {
        this.setClub(extendClub);
        return this;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ExtendedEvents user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ExtendedEvents)) {
            return false;
        }
        return id != null && id.equals(((ExtendedEvents) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ExtendedEvents{" +
            "id=" + getId() +
            ", event='" + getEvent() + "'" +
            ", date='" + getDate() + "'" +
            ", location='" + getLocation() + "'" +
            ", eventdescription='" + getEventdescription() + "'" +
            ", category='" + getCategory() + "'" +
            "}";
    }
}
