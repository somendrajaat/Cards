package com.revisecard.Repository;

import com.revisecard.Model.Card;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends MongoRepository<Card, ObjectId> {
    Card findByName(String name);
    void deleteByName(String name);

    void deleteAllById(List<ObjectId> ids);
}
