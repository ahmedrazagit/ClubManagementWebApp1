package uk.ac.bham.teamproject.service.impl;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uk.ac.bham.teamproject.domain.UniversityUser;
import uk.ac.bham.teamproject.repository.UniversityUserRepository;
import uk.ac.bham.teamproject.service.UniversityUserService;

/**
 * Service Implementation for managing {@link UniversityUser}.
 */
@Service
@Transactional
public class UniversityUserServiceImpl implements UniversityUserService {

    private final Logger log = LoggerFactory.getLogger(UniversityUserServiceImpl.class);

    private final UniversityUserRepository universityUserRepository;

    public UniversityUserServiceImpl(UniversityUserRepository universityUserRepository) {
        this.universityUserRepository = universityUserRepository;
    }

    @Override
    public UniversityUser save(UniversityUser universityUser) {
        log.debug("Request to save UniversityUser : {}", universityUser);

        // create a new UniversityUser object with the specified properties
        // UniversityUser newUser = new UniversityUser();
        universityUser.setName("John Smith");
        universityUser.setNickname("JS");
        universityUser.setRole("Student");
        universityUser.setStudentId("123456789");
        universityUser.setGender("Male");
        universityUser.setBirthday(ZonedDateTime.parse("1995-05-20T00:00:00Z"));
        universityUser.setClubs("Club A, Club B");
        universityUser.setUni("University of Example");
        universityUser.setEmail("john.smith@example.com");
        universityUser.setBalance(100L);

        // save the new UniversityUser object to the database
        return universityUserRepository.save(universityUser);
    }

    @Override
    public UniversityUser update(UniversityUser universityUser) {
        log.debug("Request to update UniversityUser : {}", universityUser);
        return universityUserRepository.save(universityUser);
    }

    @Override
    public Optional<UniversityUser> partialUpdate(UniversityUser universityUser) {
        log.debug("Request to partially update UniversityUser : {}", universityUser);

        return universityUserRepository
            .findById(universityUser.getId())
            .map(existingUniversityUser -> {
                if (universityUser.getName() != null) {
                    existingUniversityUser.setName(universityUser.getName());
                }
                if (universityUser.getNickname() != null) {
                    existingUniversityUser.setNickname(universityUser.getNickname());
                }
                if (universityUser.getRole() != null) {
                    existingUniversityUser.setRole(universityUser.getRole());
                }
                if (universityUser.getStudentId() != null) {
                    existingUniversityUser.setStudentId(universityUser.getStudentId());
                }
                if (universityUser.getGender() != null) {
                    existingUniversityUser.setGender(universityUser.getGender());
                }
                if (universityUser.getBirthday() != null) {
                    existingUniversityUser.setBirthday(universityUser.getBirthday());
                }
                if (universityUser.getClubs() != null) {
                    existingUniversityUser.setClubs(universityUser.getClubs());
                }
                if (universityUser.getUni() != null) {
                    existingUniversityUser.setUni(universityUser.getUni());
                }
                if (universityUser.getEmail() != null) {
                    existingUniversityUser.setEmail(universityUser.getEmail());
                }
                if (universityUser.getBalance() != null) {
                    existingUniversityUser.setBalance(universityUser.getBalance());
                }

                return existingUniversityUser;
            })
            .map(universityUserRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UniversityUser> findAll() {
        log.debug("Request to get all UniversityUsers");
        return universityUserRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UniversityUser> findOne(Long id) {
        log.debug("Request to get UniversityUser : {}", id);
        return universityUserRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete UniversityUser : {}", id);
        universityUserRepository.deleteById(id);
    }
}
