package app;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by lyeung on 29/04/2015.
 */
@RestController
public class ContactsController {

    private List<Contact> contacts = new ArrayList<>();


    public ContactsController() {
        contacts.add(new Contact("kermit", "frog"));
        contacts.add(new Contact("oscar", "grouch"));
    }

    @RequestMapping(value = "/contacts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Contact> getContacts() {
        return new ArrayList<>(contacts);
    }

    @RequestMapping(value = "/contacts/{lastName}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Contact getContact(@PathVariable("lastName") String lastName) {
        for (Contact contact : contacts) {
            if (contact.getLastName().equals(lastName)) {
                return contact;
            }
        }

        return new Contact("", "");
    }

    @RequestMapping(value = "/contacts", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public void saveContact(@RequestBody Contact contact) {
        contacts.add(contact);
    }
}
