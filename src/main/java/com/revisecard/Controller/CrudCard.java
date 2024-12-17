package com.revisecard.Controller;

import com.revisecard.Model.Card;
import com.revisecard.Service.CardService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


@Controller
public class CrudCard {

    @Autowired
    CardService cardService;

    @PostMapping("/addCard")
    public ResponseEntity<?> addCard(@RequestBody Card card) {
        cardService.addCard(card.getName(), card.getCode(), card.getContentType(), card.getLanguage());
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/deleteCards")
    public ResponseEntity<?> deleteCards(@RequestBody List<String> ids) {
        System.out.println(ids);
        try {
            List<ObjectId> objectIds = ids.stream()
                    .filter(id -> id.length() == 24)
                    .map(ObjectId::new)
                    .toList();
            cardService.deleteAllById(objectIds);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid ObjectId format");
        }
    }

}
