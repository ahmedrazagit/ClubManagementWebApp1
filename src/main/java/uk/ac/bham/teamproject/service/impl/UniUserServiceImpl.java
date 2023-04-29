package uk.ac.bham.teamproject.service.impl;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uk.ac.bham.teamproject.domain.UniUser;
import uk.ac.bham.teamproject.repository.UniUserRepository;
import uk.ac.bham.teamproject.service.UniUserService;

/**
 * Service Implementation for managing {@link UniUser}.
 */
@Service
@Transactional
public class UniUserServiceImpl implements UniUserService {

    private final Logger log = LoggerFactory.getLogger(UniUserServiceImpl.class);

    private final UniUserRepository uniUserRepository;

    public UniUserServiceImpl(UniUserRepository uniUserRepository) {
        this.uniUserRepository = uniUserRepository;
    }

    @Override
    public UniUser save(UniUser uniUser) {
        log.debug("Request to save UniUser : {}", uniUser);
        return uniUserRepository.save(uniUser);
    }

    @Override
    public UniUser update(UniUser uniUser) {
        log.debug("Request to update UniUser : {}", uniUser);
        return uniUserRepository.save(uniUser);
    }

    @Override
    public Optional<UniUser> partialUpdate(UniUser uniUser) {
        log.debug("Request to partially update UniUser : {}", uniUser);

        return uniUserRepository
            .findById(uniUser.getId())
            .map(existingUniUser -> {
                if (uniUser.getName() != null) {
                    existingUniUser.setName(uniUser.getName());
                }
                if (uniUser.getNickname() != null) {
                    existingUniUser.setNickname(uniUser.getNickname());
                }
                if (uniUser.getRole() != null) {
                    existingUniUser.setRole(uniUser.getRole());
                }
                if (uniUser.getStudentId() != null) {
                    existingUniUser.setStudentId(uniUser.getStudentId());
                }
                if (uniUser.getGender() != null) {
                    existingUniUser.setGender(uniUser.getGender());
                }
                if (uniUser.getBirthday() != null) {
                    existingUniUser.setBirthday(uniUser.getBirthday());
                }
                if (uniUser.getClubs() != null) {
                    existingUniUser.setClubs(uniUser.getClubs());
                }
                if (uniUser.getUni() != null) {
                    existingUniUser.setUni(uniUser.getUni());
                }
                if (uniUser.getEmail() != null) {
                    existingUniUser.setEmail(uniUser.getEmail());
                }
                if (uniUser.getBalance() != null) {
                    existingUniUser.setBalance(uniUser.getBalance());
                }

                return existingUniUser;
            })
            .map(uniUserRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UniUser> findAll() {
        log.debug("Request to get all UniUsers");
        return uniUserRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UniUser> findOne(Long id) {
        log.debug("Request to get UniUser : {}", id);
        return uniUserRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete UniUser : {}", id);
        uniUserRepository.deleteById(id);
    }
}
