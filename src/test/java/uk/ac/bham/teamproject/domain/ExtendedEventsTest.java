package uk.ac.bham.teamproject.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uk.ac.bham.teamproject.web.rest.TestUtil;

class ExtendedEventsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExtendedEvents.class);
        ExtendedEvents extendedEvents1 = new ExtendedEvents();
        extendedEvents1.setId(1L);
        ExtendedEvents extendedEvents2 = new ExtendedEvents();
        extendedEvents2.setId(extendedEvents1.getId());
        assertThat(extendedEvents1).isEqualTo(extendedEvents2);
        extendedEvents2.setId(2L);
        assertThat(extendedEvents1).isNotEqualTo(extendedEvents2);
        extendedEvents1.setId(null);
        assertThat(extendedEvents1).isNotEqualTo(extendedEvents2);
    }
}
