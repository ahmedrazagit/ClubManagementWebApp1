package uk.ac.bham.teamproject.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uk.ac.bham.teamproject.web.rest.TestUtil;

class ExtendEventTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExtendEvent.class);
        ExtendEvent extendEvent1 = new ExtendEvent();
        extendEvent1.setId(1L);
        ExtendEvent extendEvent2 = new ExtendEvent();
        extendEvent2.setId(extendEvent1.getId());
        assertThat(extendEvent1).isEqualTo(extendEvent2);
        extendEvent2.setId(2L);
        assertThat(extendEvent1).isNotEqualTo(extendEvent2);
        extendEvent1.setId(null);
        assertThat(extendEvent1).isNotEqualTo(extendEvent2);
    }
}
