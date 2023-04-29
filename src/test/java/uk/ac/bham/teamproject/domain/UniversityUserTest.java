package uk.ac.bham.teamproject.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uk.ac.bham.teamproject.web.rest.TestUtil;

class UniversityUserTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UniversityUser.class);
        UniversityUser universityUser1 = new UniversityUser();
        universityUser1.setId(1L);
        UniversityUser universityUser2 = new UniversityUser();
        universityUser2.setId(universityUser1.getId());
        assertThat(universityUser1).isEqualTo(universityUser2);
        universityUser2.setId(2L);
        assertThat(universityUser1).isNotEqualTo(universityUser2);
        universityUser1.setId(null);
        assertThat(universityUser1).isNotEqualTo(universityUser2);
    }
}
