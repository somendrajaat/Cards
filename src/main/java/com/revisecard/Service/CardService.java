package com.revisecard.Service;

import com.revisecard.Model.Card;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.revisecard.Repository.CardRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CardService {
    @Autowired
    CardRepository cardRepository;


    public List<Card> getCards() {
        return cardRepository.findAll().stream()
                .peek(card -> card.setId(card.getId()))
                .collect(Collectors.toList());

    }

    public Card getCard(String name) {
        return cardRepository.findByName(name);
    }



    public void addCard(String name, String code, String contentType, String language) {
        Card card = new Card(name, code, contentType, language);
        cardRepository.save(card);
    }



    public void deleteAllById(List<ObjectId> objectIds) {
        cardRepository.deleteAllById(objectIds);
    }
}
