package uk.ac.bham.teamproject.domain;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

public class UniversityController {

    private List<University> universities = Arrays.asList(
        new University("American University in Dubai", "https://www.aud.edu/"),
        new University("Amity University Dubai", "https://amityuniversity.ae/"),
        new University("Birla Institute of Technology and Science, Pilani", "https://www.bits-pilani.ac.in/dubai"),
        new University("De Montfort University Dubai", "https://dmudubai.com/"),
        new University("Heriot-Watt University Dubai", "https://www.hw.ac.uk/dubai/"),
        new University("Manipal Academy of Higher Education - Dubai", "https://www.manipaldubai.com/"),
        new University("Middlesex University Dubai", "https://www.mdx.ac.ae/"),
        new University("NYU Abu Dhabi", "https://nyuad.nyu.edu/en/"),
        new University("Rochester Institute of Technology of Dubai (RIT Dubai)", "https://www.rit.edu/dubai/"),
        new University("University Of Sharjah", "https://www.sharjah.ac.ae/en/"),
        new University("University of Wollongong in Dubai", "https://www.uowdubai.ac.ae/")
    );

    @GetMapping("/universities")
    public List<University> getUniversities(@RequestParam(required = false) String search) {
        if (search == null || search.isEmpty()) {
            return universities;
        } else {
            return universities
                .stream()
                .filter(university -> university.getName().toLowerCase().contains(search.toLowerCase()))
                .collect(Collectors.toList());
        }
    }
}
