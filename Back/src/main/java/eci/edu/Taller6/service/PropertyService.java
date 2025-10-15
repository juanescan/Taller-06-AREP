package eci.edu.Taller6.service;

import eci.edu.Taller6.model.Property;
import eci.edu.Taller6.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Optional<Property> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }

    public Property createProperty(Property property) {
        return propertyRepository.save(property);
    }

    public Property updateProperty(Long id, Property propertyDetails) {
        Property existingProperty = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        if (propertyDetails.getAddress() != null) {
            existingProperty.setAddress(propertyDetails.getAddress());
        }
        if (propertyDetails.getPrice() != null) {
            existingProperty.setPrice(propertyDetails.getPrice());
        }
        if (propertyDetails.getSize() != null) {
            existingProperty.setSize(propertyDetails.getSize());
        }
        if (propertyDetails.getDescription() != null) {
            existingProperty.setDescription(propertyDetails.getDescription());
        }

        return propertyRepository.save(existingProperty);
    }

    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }

    public Page<Property> getAllProperties(int page, int size) {
        return propertyRepository.findAll(PageRequest.of(page, size));
    }
    public List<Property> searchProperties(String address, Double minPrice, Double maxPrice, Double minSize, Double maxSize) {
        if (address != null && !address.isEmpty()) {
            return propertyRepository.findByAddressContainingIgnoreCase(address);
        } else {
            Specification<Property> spec = Specification.where(null);

            if (minPrice != null && maxPrice != null) {
                spec = spec.and((root, query, criteriaBuilder) ->
                        criteriaBuilder.between(root.get("price"), minPrice, maxPrice));
            }

            if (minSize != null && maxSize != null) {
                spec = spec.and((root, query, criteriaBuilder) ->
                        criteriaBuilder.between(root.get("size"), minSize, maxSize));
            }

            return propertyRepository.findAll(spec);
        }
    }
}