package eci.edu.Taller6.repository;

import eci.edu.Taller6.model.Property;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface PropertyRepository extends JpaRepository<Property, Long>, JpaSpecificationExecutor<Property> {
    Page<Property> findAll(Pageable pageable);
    List<Property> findByAddressContainingIgnoreCase(String address);
    List<Property> findByPriceBetween(Double minPrice, Double maxPrice);
    List<Property> findBySizeBetween(Double minSize, Double maxSize);
}
