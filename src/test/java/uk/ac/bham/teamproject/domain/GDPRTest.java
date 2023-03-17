package uk.ac.bham.teamproject.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uk.ac.bham.teamproject.web.rest.TestUtil;

class GDPRTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GDPR.class);
        GDPR gDPR1 = new GDPR();
        gDPR1.setId(1L);
        GDPR gDPR2 = new GDPR();
        gDPR2.setId(gDPR1.getId());
        assertThat(gDPR1).isEqualTo(gDPR2);
        gDPR2.setId(2L);
        assertThat(gDPR1).isNotEqualTo(gDPR2);
        gDPR1.setId(null);
        assertThat(gDPR1).isNotEqualTo(gDPR2);
    }
}
