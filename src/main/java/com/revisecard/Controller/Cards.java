package com.revisecard.Controller;

import com.revisecard.Model.Card;
import com.revisecard.Service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.stream.Collectors;

@Controller("")
public class Cards {


    @Autowired
    CardService cardService;

    @GetMapping("/cards")
    public ResponseEntity<?> getCards() {
        List<Card> cards = cardService.getCards().stream()
                .peek(card -> card.setId(card.getId()))
                .collect(Collectors.toList());
        if (cards.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(cards);
    }

    @GetMapping("/card")
    public Card getCard(@RequestParam String name) {
        return cardService.getCard(name);
    }

}
