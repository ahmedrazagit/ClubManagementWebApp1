package uk.ac.bham.teamproject.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uk.ac.bham.teamproject.web.rest.TestUtil;

class ExtendClubTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExtendClub.class);
        ExtendClub extendClub1 = new ExtendClub();
        extendClub1.setId(1L);
        ExtendClub extendClub2 = new ExtendClub();
        extendClub2.setId(extendClub1.getId());
        assertThat(extendClub1).isEqualTo(extendClub2);
        extendClub2.setId(2L);
        assertThat(extendClub1).isNotEqualTo(extendClub2);
        extendClub1.setId(null);
        assertThat(extendClub1).isNotEqualTo(extendClub2);
    }
}
