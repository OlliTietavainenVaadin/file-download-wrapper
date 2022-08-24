package org.vaadin.olli;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasSize;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.polymertemplate.Id;
import com.vaadin.flow.component.polymertemplate.PolymerTemplate;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.templatemodel.TemplateModel;

@Tag("file-download-wrapper")
@JsModule("./file-download-wrapper.js")
public class FileDownloadWrapper extends PolymerTemplate<FileDownloadWrapper.FileDownloadWrapperModel> implements HasSize {

    @Id("download-link")
    protected Anchor anchor;

    protected FileDownloadWrapper() {
        anchor.getElement().setAttribute("download", true);
    }

    protected FileDownloadWrapper(String fileName) {
        this();
        setFileName(fileName);

    }

    public FileDownloadWrapper(String fileName, File file) {
        this(fileName);
        setFile(file);
    }

    public FileDownloadWrapper(String fileName, DownloadBytesProvider provider) {
        this(fileName);
        setBytesProvider(fileName, provider);
    }

    public FileDownloadWrapper(StreamResource streamResource) {
        this();
        setResource(streamResource);
    }

    public void setFileName(String fileName) {
        getModel().setFileName(fileName);
    }

    public void setResource(StreamResource streamResource) {
        anchor.setHref(streamResource);
    }

    public void setBytesProvider(String fileName, DownloadBytesProvider provider) {
        setResource(new StreamResource(fileName, () -> new ByteArrayInputStream(provider.getBytes())));
    }

    public void setText(String text) {
        anchor.setText(text);
    }

    public void wrapComponent(Component component) {
        anchor.removeAll();
        if (component != null) {
            anchor.add(component);
        }
    }

    private InputStream createResource(File file) {
        try {
            return new FileInputStream(file);
        } catch (FileNotFoundException fnfe) {
            throw new IllegalArgumentException(fnfe);
        }
    }

    public void setFile(File file) {
        anchor.setHref(new StreamResource(getModel().getFileName(), () -> createResource(file)));
    }

    @FunctionalInterface
    public interface DownloadBytesProvider {

        byte[] getBytes();
    }

    public interface FileDownloadWrapperModel extends TemplateModel {
        String getFileName();

        void setFileName(String fileName);
    }
}
