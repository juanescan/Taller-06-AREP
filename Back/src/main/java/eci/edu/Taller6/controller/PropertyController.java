package eci.edu.Taller6.controller;

import eci.edu.Taller6.model.Property;
import eci.edu.Taller6.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "https://taller6homefront.duckdns.org")
public class PropertyController {

// Ensure the Property class exists in arep.taller6.taller6.model package.
// If not, create the Property.java file in src/main/java/arep/taller6/taller6/model/ with the following content:

/*
package arep.taller6.taller6.model;

public class Property {
    // Define fields, constructors, getters, and setters as needed
}
*/

    @Autowired
    private PropertyService propertyService;

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        return propertyService.getPropertyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Property createProperty(@RequestBody Property property) {
        return propertyService.createProperty(property);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property propertyDetails) {
        return ResponseEntity.ok(propertyService.updateProperty(id, propertyDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/paged")
    public Page<Property> getAllPropertiesPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return propertyService.getAllProperties(page, size);
    }
    @GetMapping("/search")
    public List<Property> searchProperties(
            @RequestParam(required = false) String address,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Double minSize,
            @RequestParam(required = false) Double maxSize) {
        return propertyService.searchProperties(address, minPrice, maxPrice, minSize, maxSize);
    }
}
