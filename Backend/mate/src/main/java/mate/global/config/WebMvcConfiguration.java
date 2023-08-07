package mate.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {

    @Value("${spring.servlet.multipart.location}")
    private String uploadDir;


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/image/**").addResourceLocations("file:///" + uploadDir)
                .setCachePeriod(3600)
                .resourceChain(true)
                .addResolver(new PathResourceResolver());
                                    //mate-server/upload/images/user/17_꼬부기.png
    }
}
