package uk.ac.bham.teamproject.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uk.ac.bham.teamproject.web.rest.TestUtil;

class UniUserTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UniUser.class);
        UniUser uniUser1 = new UniUser();
        uniUser1.setId(1L);
        UniUser uniUser2 = new UniUser();
        uniUser2.setId(uniUser1.getId());
        assertThat(uniUser1).isEqualTo(uniUser2);
        uniUser2.setId(2L);
        assertThat(uniUser1).isNotEqualTo(uniUser2);
        uniUser1.setId(null);
        assertThat(uniUser1).isNotEqualTo(uniUser2);
    }
}
