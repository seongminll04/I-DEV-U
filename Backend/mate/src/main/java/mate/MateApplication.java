package mate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "mate.repository")
public class MateApplication {

	public static void main(String[] args) {
		SpringApplication.run(MateApplication.class, args);
	}

}
