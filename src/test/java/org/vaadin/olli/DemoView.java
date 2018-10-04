package org.vaadin.olli;

import java.io.ByteArrayInputStream;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;

@Route("")
public class DemoView extends Div {

    public DemoView() {
        VerticalLayout vl = new VerticalLayout();
        Button button = new Button("Click to download");
        FileDownloadWrapper buttonWrapper = new FileDownloadWrapper(new StreamResource("foo.txt", () -> new ByteArrayInputStream("foo".getBytes())));
        buttonWrapper.wrapComponent(button);
        FileDownloadWrapper link = new FileDownloadWrapper(new StreamResource("bar.txt", () -> new ByteArrayInputStream("bar".getBytes())));
        link.setText("Look at me, I'm an <a> element");
        TextField textField = new TextField("Enter file contents");
        FileDownloadWrapper link2 = new FileDownloadWrapper("textfield.txt", () -> textField.getValue().getBytes());
        link2.setText("Download textfield.txt that has contents of the above TextField");
        vl.add(buttonWrapper, link, textField, link2);
        add(vl);
    }

}
