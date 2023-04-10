package uk.ac.bham.teamproject.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uk.ac.bham.teamproject.domain.ExtendEvent;
import uk.ac.bham.teamproject.repository.ExtendEventRepository;
import uk.ac.bham.teamproject.service.ExtendEventService;

/**
 * Service Implementation for managing {@link ExtendEvent}.
 */
@Service
@Transactional
public class ExtendEventServiceImpl implements ExtendEventService {

    private final Logger log = LoggerFactory.getLogger(ExtendEventServiceImpl.class);

    private final ExtendEventRepository extendEventRepository;

    public ExtendEventServiceImpl(ExtendEventRepository extendEventRepository) {
        this.extendEventRepository = extendEventRepository;
    }

    @Override
    public ExtendEvent save(ExtendEvent extendEvent) {
        log.debug("Request to save ExtendEvent : {}", extendEvent);
        return extendEventRepository.save(extendEvent);
    }

    @Override
    public ExtendEvent update(ExtendEvent extendEvent) {
        log.debug("Request to update ExtendEvent : {}", extendEvent);
        return extendEventRepository.save(extendEvent);
    }

    @Override
    public Optional<ExtendEvent> partialUpdate(ExtendEvent extendEvent) {
        log.debug("Request to partially update ExtendEvent : {}", extendEvent);

        return extendEventRepository
            .findById(extendEvent.getId())
            .map(existingExtendEvent -> {
                if (extendEvent.getEventname() != null) {
                    existingExtendEvent.setEventname(extendEvent.getEventname());
                }
                if (extendEvent.getDate() != null) {
                    existingExtendEvent.setDate(extendEvent.getDate());
                }
                if (extendEvent.getLocation() != null) {
                    existingExtendEvent.setLocation(extendEvent.getLocation());
                }
                if (extendEvent.getEventdescription() != null) {
                    existingExtendEvent.setEventdescription(extendEvent.getEventdescription());
                }
                if (extendEvent.getClub() != null) {
                    existingExtendEvent.setClub(extendEvent.getClub());
                }

                return existingExtendEvent;
            })
            .map(extendEventRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ExtendEvent> findAll(Pageable pageable) {
        log.debug("Request to get all ExtendEvents");
        return extendEventRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ExtendEvent> findOne(Long id) {
        log.debug("Request to get ExtendEvent : {}", id);
        return extendEventRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ExtendEvent : {}", id);
        extendEventRepository.deleteById(id);
    }
}
