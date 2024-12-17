package com.revisecard.Controller;

import com.revisecard.Model.Card;
import com.revisecard.Service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;


@Controller("home")
public class Home {
    @Autowired
    CardService cardService;


}
